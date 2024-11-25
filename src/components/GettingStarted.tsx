import { ReactElement } from "react";
import { Helmet } from "react-helmet";

// Modified SingleButtons Component
interface SingleButtonsProps {
  text: string;
  url: string;
  size?: "big"; // Only supports "big" now
}

const SingleButtons: React.FC<SingleButtonsProps> = ({
  text,
  url,
  size = "big", // Default to "big"
}) => {
  const styles = {
    button: {
      display: "inline-block",
      textDecoration: "none",
      color: "#fff",
      backgroundColor: "#007BFF",
      padding: "1rem 2rem", // Big button padding
      fontSize: "1.25rem", // Big button font size
      borderRadius: "5px",
      textAlign: "center" as const,
      fontWeight: "bold",
      margin: "0.5rem",
      transition: "background-color 0.3s ease",
    },
    hover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <a
      href={url}
      style={styles.button}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = styles.hover.backgroundColor)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)
      }
    >
      {text}
    </a>
  );
};

// Define URLs
const urls = {
  repo: "https://github.com/ustaxes/UsTaxes",
  startPage: "/info",
};

// Big Button
const singleButtonBig: ReactElement = (
  <SingleButtons text={"Begin My Tax"} url={urls.startPage} size="big" />
);

// Landing Page
export default function LandingPage(): ReactElement {
  return (
    <>
      <Helmet>
        <title>ITIN Help | Free, Private Tax Filing</title>
      </Helmet>
      <header
        style={{
          backgroundColor: "#002855",
          color: "#fff",
          padding: "3rem 1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", margin: "0 0 1rem" }}>ITIN Help</h1>
        <p
          style={{
            fontSize: "1.25rem",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.5",
          }}
        >
          File your federal and state taxes for free. ITIN Help is open-source,
          secure, and private—no sharing of personal data required.
        </p>
        <div style={{ marginTop: "2rem" }}>{singleButtonBig}</div>
      </header>
      <section
        style={{
          backgroundColor: "#f5f5f5",
          padding: "3rem 1rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
            Why Choose ITIN Help?
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              fontSize: "1.125rem",
              lineHeight: "1.75",
              color: "#393",
            }}
          >
            <li style={{ marginBottom: "1rem" }}>
              <strong>Free & Open Source:</strong> No fees, fully transparent.
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Private & Secure:</strong> Your data stays on your device.
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Comprehensive:</strong> Supports many federal forms and
              select states.
            </li>
          </ul>
        </div>
      </section>
      <section style={{ padding: "3rem 1rem", textAlign: "left" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Supported Federal Forms
          </h2>
          <p style={{ fontSize: "1.125rem", color: "#333" }}>
            UsTaxes supports the most commonly needed income and credit forms,
            including:
          </p>
          <ul
            style={{
              fontSize: "1rem",
              lineHeight: "1.75",
              marginLeft: "1.5rem",
            }}
          >
            <li>W2, 1099-INT, 1099-DIV, 1099-B</li>
            <li>SSA-1099, 1099-R, W7, W7-COA, and more</li>
            <li>Schedules A, B, D, E, SE, and more</li>
          </ul>
          <h3 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
            Supported Credits
          </h3>
          <ul
            style={{
              fontSize: "1rem",
              lineHeight: "1.75",
              marginLeft: "1.5rem",
            }}
          >
            <li>Child Tax Credit</li>
            <li>Earned Income Tax Credit</li>
          </ul>
          <h3 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
            State Support
          </h3>
          <p style={{ fontSize: "1.125rem", color: "#333" }}>
            Currently, 9 states are supported. States without income tax, such
            as Alaska and Texas, require no filing.
          </p>
        </div>
      </section>
      <footer
        style={{
          backgroundColor: "#002855",
          color: "#fff",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
          Built with ❤️ by <a style={{ color: "#4db8ff" }}>ITIN Help</a>
        </p>
        <p style={{ fontSize: "0.875rem", color: "#ddd" }}>
          © {new Date().getFullYear()} ITIN Help. All rights reserved.
        </p>
      </footer>
    </>
  );
}
