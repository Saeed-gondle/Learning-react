function ResetButton({dispatch}) {
    return (
      <button className="btn btn-reset" onClick={() => dispatch({type: 'reset'})}>
        Reset
      </button>
    )
}

export default ResetButton
