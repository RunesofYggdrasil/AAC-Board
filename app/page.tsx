import styles from "./page.module.css";
import ColorButton from "./components/ColorButton";

export default function Home() {
  return (
    <>
      <ColorButton />
      <ColorButton color="Two" />
    </>
  );
}
