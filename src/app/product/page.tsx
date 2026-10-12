import type { Metadata } from "next";
import styles from "../styles/About.module.css";
import cardStyles from "../styles/Card.module.css";
import product from "../styles/Product.module.css";
import { listReviews } from "../lib/reviews";
import ReviewSection from "./ReviewSection";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Configure and inspect Cisco switches and routers from Windows. Download the 7-day trial of NetPort Pro.",
};

export const dynamic = "force-dynamic";

export default async function ProductPage() {
  const reviews = await listReviews();
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={cardStyles.header}>Products</div>
        <div className={styles.bioSection}>
          <div className={`${styles.textContent} ${product.panel}`}>
            <h1>NetPort Pro</h1>
            <p>
              Configure and inspect Cisco switches and routers from Windows. Connect over SSH,
              Telnet, or a console cable.
            </p>
            <h2>7-day trial</h2>
            <p>
              The trial lasts seven days from the first time you launch it on a computer. Once
              the trial ends, the program displays “The 7-day trial has ended.” and can no
              longer be opened.
            </p>
            <p>
              The trial reads credentials.ini from the folder containing the exe file. The file
              is blank when downloaded. Enter your enable password and console username and
              password in it as needed. Enter your SSH or Telnet username and password
              directly in the program window.
            </p>
            <div className={product.actions}>
              <a className={product.button} href="/downloads/NetProProTrial.exe" download>
                Download the trial
              </a>
              <a className={product.buttonSecondary} href="/downloads/credentials.ini" download>
                Download credentials.ini
              </a>
            </div>
            <p className={product.note}>Windows 10 or 11, 64-bit.</p>
            <ReviewSection initialReviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
