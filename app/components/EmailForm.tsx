import { Html, Text, Preview, Link } from "@react-email/components";

type FormProps = {
  registro: {
    nome: string;
    email: string;
    telefone: string;
    preferenciaLigacao: boolean;
    preferenciaWhatsapp: boolean;
    preferenciaEmail: boolean;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento?: string;
    cidade: string;
    estado: string;
    objetivoProjeto: string;
  };
};

export function EmailForm({ registro }: FormProps) {
  const preferenciasContato = [
    registro.preferenciaLigacao && "Ligação",
    registro.preferenciaWhatsapp && "WhatsApp",
    registro.preferenciaEmail && "E-mail",
  ].filter(Boolean);

  return (
    <Html>
      <Link
        href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Preview>{registro.nome} preencheu as informações do formulário</Preview>
      <Text style={title}>Dados do formulário</Text>
      <Text style={text}>
        <strong>Nome: </strong>
        {registro.nome}
      </Text>
      <Text style={text}>
        <strong>E-mail: </strong>
        {registro.email}
      </Text>
      <Text style={text}>
        <strong>Telefone: </strong>
        {registro.telefone}
      </Text>
      <Text style={text}>
        <strong>Preferências de contato: </strong>
        {preferenciasContato.map((pref, index) => (
          <span key={index}>
            {pref}
            {index < preferenciasContato.length - 1 && " | "}
          </span>
        ))}
      </Text>
      <Text style={text}>
        <strong>Objetivo do projeto: </strong>
        {registro.objetivoProjeto}
      </Text>
      <Text style={text}>
        <strong>CEP: </strong>
        {registro.cep}
      </Text>
      <Text style={text}>
        <strong>Endereço: </strong>
        {registro.logradouro}
      </Text>
      <Text style={text}>
        <strong>Número: </strong>
        {registro.numero}
      </Text>
      <Text style={text}>
        <strong>Bairro: </strong>
        {registro.bairro}
      </Text>
      <Text style={text}>
        <strong>Complemento: </strong>
        {registro.complemento}
      </Text>
      <Text style={text}>
        <strong>Cidade: </strong>
        {registro.cidade}
      </Text>
      <Text style={text}>
        <strong>Estado: </strong>
        {registro.estado}
      </Text>
    </Html>
  );
}

const title = {
  fontFamily: "Mukta, sans-serif",
  fontSize: 20,
  fontWeight: "bold",
};

const text = {
  fontFamily: "Mukta, sans-serif",
  fontSize: 14,
  margin: 6,
};
