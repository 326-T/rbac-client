export default function Confirmation() {
  return (
    <div
      className="
        space-y-5
      "
    >
      <div className="w-full flex justify-center">
        <h3>本当に削除してもよろしいですか？</h3>
      </div>
      <div className="w-full flex justify-center">
        <button className="p-3 rounded-lg title-medium text-white bg-primary-400">
          OK
        </button>
      </div>
    </div>
  );
}
