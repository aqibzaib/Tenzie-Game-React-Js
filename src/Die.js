export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die" style={style} onClick={props.holdDice}>
      {props.value}
    </div>
  );
}
