import PropTypes from 'prop-types';

const IncrementFeature = ({value, setValue}) => {

  return (
    <>
      <div className="w-28 flex items-center justify-between rounded-full border border-teal-800 p-1">
        <div onClick={() => setValue(value => value > 1 ? value - 1 : 1)}
        className="w-8 p-1 text-white font-bold cursor-pointer bg-teal-900 flex items-center justify-center rounded-full hover:bg-teal-950"
        >
          -  
        </div>

        <p>{value}</p>

        <div  onClick={() => setValue(value => value + 1)}
        className="w-8 p-1 text-white font-bold cursor-pointer bg-teal-900 flex items-center justify-center rounded-full hover:bg-teal-950"
        >  
          +
        </div>
      </div>
    </>
  )
}

IncrementFeature.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default IncrementFeature;