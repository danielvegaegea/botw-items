//import HomepageText from '../assets/markdown/HomepageText.mdx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BotwHeader from '../components/BotwHeader';

const markdownText = `
# Presentación
Esto es una página de prueba para ver si todo funciona.
Veamos un texto en **negrita** y otro en _cursiva_.

## Hello, world!
Esto es un segundo párrafo.
`;

const Homepage = () => {
  return (
    <>
      <BotwHeader />
      <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} />
    </>
  );
};

export default Homepage;
