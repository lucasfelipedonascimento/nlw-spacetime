import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from "axios";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
  try {
    app.post('/register', async (request) => {
      const bodySchema = z.object({
        code: z.string(),
      })
  
      const { code } = bodySchema.parse(request.body);
      
  
      const accessTokenResponse = await axios.post('https://github.com/login/oauth/access_token', 
        null,
        {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        },
      )
    
      const { access_token } = accessTokenResponse.data
  
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const { id, login, avatar_url, name } = userResponse.data

      const userSchema = z.object({
        id: z.number(),
        login: z.string(),
        name: z.string(),
        avatar_url: z.string().url(),
      })
      type userInfoProps = z.infer<typeof userSchema>

      const userInfo: userInfoProps = {
        id, 
        name, 
        login,
        avatar_url,
      }
  
      let user = await prisma.user.findUnique({
        where: {
          githubId: userInfo.id,
        },
      })
  
      if (!user) {
        user = await prisma.user.create({
          data: {
            githubId: userInfo.id,
            login: userInfo.login,
            name: userInfo.login,
            avatar: userInfo.avatar_url,
          },
        })
      }

      const token = app.jwt.sign(
        {
          // coloco informações que podem ser públicas
          name: user.name,
          avatar: user.avatar,
        }, 
        {
          // colocar informações únicas de um usuário
          sub: user.id,
          expiresIn: '30 days',
        },
      )
      
      return {
        token,
      }
    })
  } catch (error) {
    console.log(error);
  }
  
}