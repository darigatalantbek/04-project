import './styles.css'

function Buttons({changeFilter}) {
    return (
        <div className='btn_line'>
          <button onClick={() =>changeFilter('To Do')} className='btn'>
            To Do
          </button>
          <button onClick={() => changeFilter('Done')} className='btn'>
            Done
          </button>
          <button onClick={() => changeFilter('Trash')} className='btn'>
            Trash
          </button>
        </div>
    )
}

export default Buttons;