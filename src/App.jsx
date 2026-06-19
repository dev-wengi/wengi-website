import { PageLayout } from "./layout/PageLayout"
import {Home} from "./pages/Home"
import {About} from "./pages/About"
import {FAQs} from "./pages/FAQs"
import {Gallery} from "./pages/Gallery"
import {Projects} from "./pages/Projects"

function App() {

  return (
    <>
      <PageLayout>
        {/* Home content */}
        <Home />
        {/* About content */}
        <About />
        {/* FAQs content */}
        <FAQs />
        {/* Projects content */}
        <Projects />
        {/* Gallery content */}
        <Gallery />
      </PageLayout>
    </>
  );
}

export default App
