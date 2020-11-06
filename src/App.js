import Header from "./components/Header";
import Weather from "./components/Weather";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="text-center">
      <Header />
      <main>
        <Weather />
      </main>
      <Footer />
    </div>
  );
};

export default App;
