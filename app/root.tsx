import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./globals.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <title>M30 Arquitetura</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="M30 Arquitetura" />
        <meta name="keywords" content="m30, m30 arquitetura" />
        <meta name="title" content="M30 Arquitetura" />
        <meta
          name="description"
          content="A M30 é um escritório de arquitetura, que busca alinhar tecnologia e design, com uma entrega autêntica e atemporal para seus clientes. Baseando-se na arquitetura moderna brasileira, mas com o uso de novas tecnologias e materiais."
        />
        <Meta />
        <Links />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://www.m30.arq.br" />
        <link rel="icon" type="ico" href="favicon.ico" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
