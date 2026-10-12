export const productLocales = ["en", "ja", "pt"] as const;

export type ProductLocale = (typeof productLocales)[number];

export const defaultProductLocale: ProductLocale = "en";

export const productLocaleLabels: Record<ProductLocale, string> = {
  en: "EN",
  ja: "JA",
  pt: "PRT",
};

export const productLocaleNames: Record<ProductLocale, string> = {
  en: "English",
  ja: "日本語",
  pt: "Português",
};

export const productDateLocales: Record<ProductLocale, string> = {
  en: "en-US",
  ja: "ja-JP",
  pt: "pt-BR",
};

export type ProductCopy = {
  pageTitle: string;
  description: string;
  introTitle: string;
  intro: string;
  screenshotAlt: string;
  trialTitle: string;
  trialBody: string;
  credentialsBody: string;
  downloadTrial: string;
  downloadCredentials: string;
  windowsNote: string;
  reviewsTitle: string;
  name: string;
  rating: string;
  starLabel: string;
  review: string;
  publish: string;
  sending: string;
  empty: string;
  saveError: string;
  readError: string;
  nameError: string;
  ratingError: string;
  shortError: string;
};

export const productCopy: Record<ProductLocale, ProductCopy> = {
  en: {
    pageTitle: "Products",
    description:
      "A practical networking tool for IT professionals. Download the 7-day trial of NetPort Pro.",
    introTitle: "A Practical Networking Tool for IT Professionals",
    intro:
      "NetPort Pro was designed for network engineers and system administrators to configure and inspect Cisco switches and routers from Windows. Connect over SSH, Telnet, or a console cable.",
    screenshotAlt: "NetPort Pro window",
    trialTitle: "7-day trial",
    trialBody:
      "The trial lasts seven days from the first time you launch it on a computer. Once the trial ends, the program displays “The 7-day trial has ended.” and can no longer be opened.",
    credentialsBody:
      "The trial reads credentials.ini from the folder containing the exe file. The file is blank when downloaded. Enter your enable password and console username and password in it as needed. Enter your SSH or Telnet username and password directly in the program window.",
    downloadTrial: "Download the trial",
    downloadCredentials: "Download credentials.ini",
    windowsNote: "Windows 10 or 11, 64-bit.",
    reviewsTitle: "Reviews",
    name: "Name",
    rating: "Rating",
    starLabel: "{n} of 5",
    review: "Review",
    publish: "Publish review",
    sending: "Sending…",
    empty: "No reviews yet.",
    saveError: "The review could not be saved.",
    readError: "The review could not be read.",
    nameError: "Enter your name.",
    ratingError: "Choose a rating from 1 to 5.",
    shortError: "Write a short review.",
  },
  ja: {
    pageTitle: "製品",
    description:
      "ITプロフェッショナルのための実用的なネットワークツールです。NetPort Pro の7日間トライアルをダウンロードできます。",
    introTitle: "ITプロフェッショナルのための実用的なネットワークツール",
    intro:
      "NetPort Pro は、ネットワークエンジニアとシステム管理者が Windows から Cisco のスイッチとルーターを設定し、確認できるように設計されました。SSH、Telnet、またはコンソールケーブルで接続します。",
    screenshotAlt: "NetPort Pro の画面",
    trialTitle: "7日間トライアル",
    trialBody:
      "トライアルは、そのコンピュータで初めて起動した日から7日間です。期間が終わると、プログラムは「The 7-day trial has ended.」と表示し、開くことができなくなります。",
    credentialsBody:
      "トライアルは、exe ファイルがあるフォルダの credentials.ini を読み込みます。ダウンロードしたファイルは空です。enable パスワードと、コンソールのユーザー名およびパスワードを、必要に応じてそのファイルに入力してください。SSH または Telnet のユーザー名とパスワードは、プログラムの画面に直接入力します。",
    downloadTrial: "トライアルをダウンロード",
    downloadCredentials: "credentials.ini をダウンロード",
    windowsNote: "Windows 10 または 11、64ビット。",
    reviewsTitle: "レビュー",
    name: "名前",
    rating: "評価",
    starLabel: "5段階中{n}",
    review: "レビュー",
    publish: "レビューを公開",
    sending: "送信中…",
    empty: "まだレビューはありません。",
    saveError: "レビューを保存できませんでした。",
    readError: "レビューを読み取れませんでした。",
    nameError: "名前を入力してください。",
    ratingError: "1から5の評価を選んでください。",
    shortError: "短いレビューを書いてください。",
  },
  pt: {
    pageTitle: "Produtos",
    description:
      "Uma ferramenta prática de rede para profissionais de TI. Baixe a avaliação de 7 dias do NetPort Pro.",
    introTitle: "Uma ferramenta prática de rede para profissionais de TI",
    intro:
      "O NetPort Pro foi projetado para que engenheiros de rede e administradores de sistemas configurem e inspecionem switches e roteadores Cisco no Windows. Conecte por SSH, Telnet ou cabo de console.",
    screenshotAlt: "Janela do NetPort Pro",
    trialTitle: "Avaliação de 7 dias",
    trialBody:
      "A avaliação dura sete dias a partir da primeira vez em que você a abre em um computador. Quando a avaliação termina, o programa exibe “The 7-day trial has ended.” e não pode mais ser aberto.",
    credentialsBody:
      "A avaliação lê o credentials.ini na pasta do arquivo exe. O arquivo vem em branco. Informe nele a senha de enable e o usuário e a senha do console, conforme necessário. Informe o usuário e a senha de SSH ou Telnet diretamente na janela do programa.",
    downloadTrial: "Baixar a avaliação",
    downloadCredentials: "Baixar credentials.ini",
    windowsNote: "Windows 10 ou 11, 64 bits.",
    reviewsTitle: "Avaliações",
    name: "Nome",
    rating: "Nota",
    starLabel: "{n} de 5",
    review: "Comentário",
    publish: "Publicar avaliação",
    sending: "Enviando…",
    empty: "Ainda não há avaliações.",
    saveError: "Não foi possível salvar a avaliação.",
    readError: "Não foi possível ler a avaliação.",
    nameError: "Informe seu nome.",
    ratingError: "Escolha uma nota de 1 a 5.",
    shortError: "Escreva uma avaliação curta.",
  },
};

export function parseProductLocale(
  value: string | string[] | undefined | null
): ProductLocale {
  const raw = Array.isArray(value) ? value[0] : value;
  return productLocales.includes(raw as ProductLocale)
    ? (raw as ProductLocale)
    : defaultProductLocale;
}
