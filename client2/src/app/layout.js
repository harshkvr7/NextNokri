import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; // Assuming you created the Sidebar component
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

        <main className="flex w-3/4 justify-self-center">
          <div className="p-6 ml-auto w-2/3">
            {children}
          </div>

          <aside className="p-6 border-l border-gray-300">
            <Sidebar />
          </aside>
        </main>

        <footer className="bg-gray-100 mt-12">
          <Footer />
        </footer>
      </body>
    </html>
  );
};

export default Layout;
