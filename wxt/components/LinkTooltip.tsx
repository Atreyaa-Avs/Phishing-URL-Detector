import AcceptSvg from "@/assets/accept.svg";
import RejectSvg from "@/assets/reject.svg";

type TooltipContent = {
  url: string;
  label: string;
  confidence: number;
  loading?: boolean;
};

const LinkTooltip = ({ content }: { content: TooltipContent }) => {
  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        padding: "6px 8px",
        borderRadius: "6px",
        fontSize: "12px",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        minWidth: "250px",
        maxWidth: "420px",
      }}
    >
      {content.loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "-1px",
              marginBottom: "-3px",
              fontFamily: "Gilroy, sans-serif",
            }}
          >
            Checking for:
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "medium",
              fontFamily: "Gilroy, sans-serif",
              marginTop: "10px",
              textWrap: "pretty",
            }}
          >
            {content.label.slice(0, 60) + (content.label.length > 60 ? "..." : "")}
          </p>
          <div className="loader" style={{ width: "100%" }}></div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
            width: "100%",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div style={{ flexBasis: "70%", display: "flex", flexDirection: "column" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: "Gilroy, sans-serif",
                marginBottom: "-3px",
              }}
            >
              {content.label}
            </h1>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "medium",
                fontFamily: "Gilroy, sans-serif",
                marginBottom: "-3px",
                textWrap: "pretty",
              }}
            >
              {content.url}
            </h2>
            <h3
              style={{
                fontSize: "14px",
                fontFamily: "Gilroy, sans-serif",
                fontWeight: "normal",
              }}
            >
              <span style={{ fontWeight: "medium" }}>Confidence:</span>{" "}
              {content.confidence}%
            </h3>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignSelf: "right",
              marginRight: "15px",
            }}
          >
            {content.label === "Safe Website" ? (
              <img
                src={AcceptSvg}
                alt="Accept"
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <img
                src={RejectSvg}
                alt="Reject"
                style={{ width: "50px", height: "50px" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkTooltip;
