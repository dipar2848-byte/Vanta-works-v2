import { Helmet } from "react-helmet-async";

export default function App() {
  return (
    <>
      <Helmet>
        <title>VantaWorks Test</title>
      </Helmet>

      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          padding: "40px",
          fontSize: "32px"
        }}
      >
        VantaWorks Test
      </div>
    </>
  );
}