import bg from "../assets/bg.jpg";

function Bg() {
  return (
    <div className="bg"
      style={{ backgroundImage: `url(${bg})` }}
    />
  );
}

export default Bg;