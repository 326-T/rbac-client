import axios from "axios";

export default function ErrorButton() {
  const onClick = () => {
    axios.get("/error");
  };
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-lg title-medium text-white bg-primary-400"
    >
      エラー発生ボタン
    </button>
  );
}
