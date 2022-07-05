export default function DropdownMenuInput(props) {
  return (
    <div className="flex flex-col">
      <button
        onClick={props.dropdownButton.onClick}
        className=" w-16 bg-zinc-700 text-gray-400 font-semibold py-0.5 rounded-md"
      >
        {props.dropdownButton.text}
      </button>
      {props.toggleState && (
        <div className="relative">
          <ol className="w-16 top-1 absolute z-50 flex flex-col px-2 py-1 bg-zinc-700 rounded-md">
            {props.dropdownButtons.map((dropdownButton) => (
              <li className="flex justify-center">
                <button
                  key={dropdownButton.text}
                  onClick={dropdownButton.onClick}
                  className="text-gray-400 font-semibold"
                >
                  {dropdownButton.text}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
