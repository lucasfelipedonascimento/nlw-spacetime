import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

/* 
  Essa função middleware verifica se o usuário tem um token de autenticação válido em seus cookies. Se não houver um token, ele redireciona o usuário para a página de login com um cookie `redirectTo` que contém a página atual que o usuário estava acessando antes de ser redirecionado. Se houver um token, ele passa o controle para o próximo middleware ou para a rota específica que está sendo acessada.
*/

export function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${req.url}; Path=/; HttpOnly; max-age=20`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
