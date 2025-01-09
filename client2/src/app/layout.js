import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>NextNokri</title>
        <link rel="icon" href="/image.png" type="image/png" />
        <meta name="description" content="A brief description of your website for SEO and sharing." />
      </head>
      <body className="bg-gray-50">
        <header>
          <Navbar />
        </header>

        <main className="flex-1 justify-center flex">{children}</main>

        <footer className="bg-gray-100 mt-12">
          <Footer />
        </footer>
      </body>
    </html>
  );
};

export default Layout;
