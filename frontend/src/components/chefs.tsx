import '../styles/chefs.css';
import chef1 from '../assets/chef1.jpeg'
import chef2 from '../assets/chef2.jpg'
import chef3 from '../assets/chef3.jpg'
function chefs() {
  return (
    <div className='chefs-container'>
      <div className='chefs-desc-container'>
        <p className='chefs-title'>OUR CHEFS</p>

        <p className='chefs-desc'>
          THe emphasi on "speaking louder of words" implies that the culinary
          experience is so powerful that it transcens the need for verbal
          expression.
        </p>
      </div>
      <div className='chefs-info-container'>
        <div className='chefs-info'>
            <img src={chef1} alt="" />
            <p>Dianne Russell</p>
        </div>
        <div className='chefs-info'>
            <img src={chef2} alt="" />
            <p>Guy Hawkins</p>
        </div>
        <div className='chefs-info'>
            <img src={chef3} alt="" />
            <p>Ronald Richareds</p>
        </div>
      </div>
    </div>
  );
}

export default chefs;
