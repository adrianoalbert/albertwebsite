export const privacyLocales = ["en", "ja", "pt"] as const;

export type PrivacyLocale = (typeof privacyLocales)[number];

export const defaultPrivacyLocale: PrivacyLocale = "en";

export type PrivacyCopy = {
  pageTitle: string;
  description: string;
  heading: string;
  lead: string;
  intro: string;
  collectTitle: string;
  collectIntro: string;
  collectItems: [string, string, string];
  collectNot: string;
  whyTitle: string;
  whyBody: string;
  storageTitle: string;
  storageLocal: string;
  storageTransmit: string;
  sharingTitle: string;
  sharingBody: string;
  contactTitle: string;
  contactIntro: string;
};

export const privacyCopy: Record<PrivacyLocale, PrivacyCopy> = {
  en: {
    pageTitle: "Privacy Policy",
    description:
      "How NetPort Pro handles personal information, including credentials, device details, storage, and contact.",
    heading: "Privacy Policy",
    lead: "This policy explains how NetPort Pro handles personal information.",
    intro:
      "NetPort Pro is a Windows application published by Adriano Albert Muniz. It is used to connect to, inspect, and configure Cisco switches and routers over SSH, Telnet, or a console cable. This page covers the application itself. Effective date: November 3, 2026.",
    collectTitle: "What the app accesses or collects",
    collectIntro:
      "NetPort Pro uses only the information you provide so it can talk to the network devices you choose:",
    collectItems: [
      "Connection details you enter, such as a device IP address or hostname, port, and protocol (SSH, Telnet, or serial console).",
      "Account names and credentials you enter in the program window, such as SSH or Telnet username and password.",
      "Device details returned during a session, such as the device hostname and command or configuration output. Saved files may use the device hostname in the filename.",
    ],
    collectNot:
      "The app does not collect a Microsoft account, email address, contacts, location, photos, or browsing history.",
    whyTitle: "Why the app uses it",
    whyBody:
      "That information is used to connect to and configure the network devices you select, and to save command output on your computer. It is not used for advertising or analytics.",
    storageTitle: "Storage, transmission, and protection",
    storageLocal:
      "Usernames and passwords typed in the program window are used to authenticate to the devices you connect to during that session.",
    storageTransmit:
      "Information is transmitted only to the devices you choose, over SSH, Telnet, or a local console cable. SSH is encrypted by the protocol. Telnet and serial console are not encrypted. The app does not send credentials, device output, or other personal information to Adriano Albert Muniz or to any internet service.",
    sharingTitle: "Sharing",
    sharingBody:
      "NetPort Pro does not sell personal information and does not share it with third parties. Data you enter or retrieve is used on your computer and sent only to devices you choose to connect to.",
    contactTitle: "Contact",
    contactIntro:
      "For privacy questions about NetPort Pro, contact Adriano Albert Muniz:",
  },
  ja: {
    pageTitle: "プライバシーポリシー",
    description:
      "NetPort Pro が認証情報、機器の情報、保存、問い合わせを含む個人情報をどのように扱うか。",
    heading: "プライバシーポリシー",
    lead: "このポリシーは、NetPort Pro が個人情報をどのように扱うかを説明します。",
    intro:
      "NetPort Pro は Adriano Albert Muniz が公開する Windows アプリケーションです。SSH、Telnet、またはコンソールケーブルで Cisco のスイッチおよびルーターに接続し、確認・設定するために使います。このページはアプリケーション本体についての説明です。施行日: 2026年11月3日。",
    collectTitle: "アプリが取得・利用する情報",
    collectIntro:
      "NetPort Pro は、選択したネットワーク機器と通信するために、利用者が入力した情報だけを使います。",
    collectItems: [
      "入力した接続情報。機器の IP アドレスやホスト名、ポート、プロトコル（SSH、Telnet、またはシリアルコンソール）など。",
      "プログラム画面に入力するアカウント名と認証情報。SSH / Telnet のユーザー名とパスワードなど。",
      "セッション中に機器から返される情報。ホスト名、コマンド出力や設定内容など。保存ファイル名に機器のホスト名を使う場合があります。",
    ],
    collectNot:
      "アプリは Microsoft アカウント、メールアドレス、連絡先、位置情報、写真、閲覧履歴を収集しません。",
    whyTitle: "利用目的",
    whyBody:
      "これらの情報は、選択したネットワーク機器への接続と設定、およびコンピュータ上へのコマンド出力の保存のために使います。広告や分析には使いません。",
    storageTitle: "保存、送信、保護",
    storageLocal:
      "プログラム画面に入力したユーザー名とパスワードは、そのセッションで接続先機器への認証に使います。",
    storageTransmit:
      "情報は、利用者が選んだ機器に対してのみ、SSH、Telnet、またはローカルのコンソールケーブルで送信されます。SSH はプロトコルにより暗号化されます。Telnet とシリアルコンソールは暗号化されません。アプリは認証情報、機器の出力、その他の個人情報を Adriano Albert Muniz やインターネット上のサービスには送りません。",
    sharingTitle: "第三者提供",
    sharingBody:
      "NetPort Pro は個人情報を販売せず、第三者にも提供しません。入力または取得したデータは、利用者のコンピュータ上で使われ、接続先として選んだ機器にのみ送られます。",
    contactTitle: "お問い合わせ",
    contactIntro:
      "NetPort Pro のプライバシーに関するお問い合わせは、Adriano Albert Muniz までご連絡ください。",
  },
  pt: {
    pageTitle: "Política de privacidade",
    description:
      "Como o NetPort Pro trata informações pessoais, incluindo credenciais, dados de dispositivos, armazenamento e contato.",
    heading: "Política de privacidade",
    lead: "Esta política explica como o NetPort Pro trata informações pessoais.",
    intro:
      "O NetPort Pro é um aplicativo para Windows publicado por Adriano Albert Muniz. Ele é usado para conectar, inspecionar e configurar switches e roteadores Cisco por SSH, Telnet ou cabo de console. Esta página refere-se ao próprio aplicativo. Data de vigência: 3 de novembro de 2026.",
    collectTitle: "O que o aplicativo acessa ou coleta",
    collectIntro:
      "O NetPort Pro usa apenas as informações que você informa para se comunicar com os dispositivos de rede que você escolher:",
    collectItems: [
      "Detalhes de conexão que você informa, como endereço IP ou nome do host, porta e protocolo (SSH, Telnet ou console serial).",
      "Nomes de conta e credenciais que você informa na janela do programa, como usuário e senha de SSH ou Telnet.",
      "Detalhes do dispositivo obtidos durante uma sessão, como o nome do host e a saída de comandos ou da configuração. Os arquivos salvos podem usar o nome do host no nome do arquivo.",
    ],
    collectNot:
      "O aplicativo não coleta conta Microsoft, endereço de e-mail, contatos, localização, fotos nem histórico de navegação.",
    whyTitle: "Por que o aplicativo usa essas informações",
    whyBody:
      "Essas informações são usadas para conectar e configurar os dispositivos de rede que você seleciona e salvar a saída de comandos no seu computador. Não são usadas para publicidade nem análise.",
    storageTitle: "Armazenamento, transmissão e proteção",
    storageLocal:
      "Usuário e senha digitados na janela do programa são usados para autenticar nos dispositivos aos quais você se conecta nessa sessão.",
    storageTransmit:
      "As informações são transmitidas apenas aos dispositivos que você escolhe, por SSH, Telnet ou cabo de console local. O SSH é criptografado pelo protocolo. Telnet e console serial não são criptografados. O aplicativo não envia credenciais, saída de dispositivos nem outras informações pessoais a Adriano Albert Muniz nem a nenhum serviço na internet.",
    sharingTitle: "Compartilhamento",
    sharingBody:
      "O NetPort Pro não vende informações pessoais e não as compartilha com terceiros. Os dados que você informa ou obtém são usados no seu computador e enviados apenas aos dispositivos que você escolhe conectar.",
    contactTitle: "Contato",
    contactIntro:
      "Para dúvidas de privacidade sobre o NetPort Pro, entre em contato com Adriano Albert Muniz:",
  },
};

export function parsePrivacyLocale(
  value: string | string[] | undefined | null
): PrivacyLocale {
  const raw = Array.isArray(value) ? value[0] : value;
  return privacyLocales.includes(raw as PrivacyLocale)
    ? (raw as PrivacyLocale)
    : defaultPrivacyLocale;
}
