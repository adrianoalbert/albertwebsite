import type { Metadata } from "next";
import styles from "../styles/About.module.css";
import cardStyles from "../styles/Card.module.css";
import product from "../styles/Product.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NetPort Pro handles personal information, including credentials, device details, storage, and contact.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={cardStyles.header}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cardStyles.headerIcon}
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Privacy Policy
        </div>
        <div className={styles.bioSection}>
          <div className={`${styles.textContent} ${product.panel}`}>
            <h1>NetPort Pro</h1>
            <p className={product.lead}>
              This policy explains how NetPort Pro handles personal information.
            </p>
            <p>
              NetPort Pro is a Windows application published by Adriano Albert Muniz.
              It is used to connect to, inspect, and configure Cisco switches and
              routers over SSH, Telnet, or a console cable. This page covers the
              application itself. Effective date: November 3, 2026.
            </p>

            <h2>What the app accesses or collects</h2>
            <p>
              NetPort Pro uses only the information you provide so it can talk to
              the network devices you choose:
            </p>
            <ul>
              <li>
                Connection details you enter, such as a device IP address or
                hostname, port, and protocol (SSH, Telnet, or serial console).
              </li>
              <li>
                Account names and credentials you enter: SSH or Telnet username
                and password in the program window, and enable password plus
                console username and password in <code>credentials.ini</code> when
                you fill that file in.
              </li>
              <li>
                Device details returned during a session, such as the device
                hostname and command or configuration output. Saved files may use
                the device hostname in the filename.
              </li>
              <li>
                A local record of the first launch date on that computer, used
                only to enforce the 30-day trial.
              </li>
            </ul>
            <p>
              The app does not collect a Microsoft account, email address,
              contacts, location, photos, or browsing history.
            </p>

            <h2>Why the app uses it</h2>
            <p>
              That information is used to connect to and configure the network
              devices you select, to save command output on your computer, and to
              apply the trial period on that computer. It is not used for
              advertising or analytics.
            </p>

            <h2>Storage, transmission, and protection</h2>
            <p>
              Credentials in <code>credentials.ini</code> stay in that file next
              to the program on your computer. The file is plain text, so you
              should protect it with Windows file permissions and not share it.
              Usernames and passwords typed in the program window are used to
              authenticate to the devices you connect to during that session.
            </p>
            <p>
              Information is transmitted only to the devices you choose, over
              SSH, Telnet, or a local console cable. SSH is encrypted by the
              protocol. Telnet and serial console are not encrypted. The app
              does not send credentials, device output, or other personal
              information to Adriano Albert Muniz or to any internet service.
            </p>
            <p>
              The trial first-launch date is stored only on your computer.
            </p>

            <h2>Sharing</h2>
            <p>
              NetPort Pro does not sell personal information and does not share
              it with third parties. Data you enter or retrieve is used on your
              computer and sent only to devices you choose to connect to.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy questions about NetPort Pro, contact Adriano Albert
              Muniz:
            </p>
            <ul>
              <li>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/adrianoalbertmuniz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/adrianoalbertmuniz
                </a>
              </li>
              <li>
                Website:{" "}
                <a href="https://www.adrianoalbert.com">www.adrianoalbert.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
