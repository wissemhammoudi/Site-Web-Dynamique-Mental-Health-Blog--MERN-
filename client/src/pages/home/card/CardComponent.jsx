import React from 'react';
import styles from '../card/CardComponent.module.css'



function CardComponent(props) {
    const [isPlaying, setIsPlaying] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ left: 0, top: 0 });

  const handleClick = () => {
    // Toggle the isPlaying state
    setIsPlaying(!isPlaying);

    // Calculate random position
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const maxLeft = containerWidth - 100; // Width of the button
    const maxTop = containerHeight - 100; // Height of the button
    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop);

    // Set button position
    setButtonPosition({ left: randomLeft, top: randomTop });
  };
    console.log(props.is_service);
    return (
        <>
            {!props.is_service ? (
                <div className={styles.card}>
                    <div className={styles.card_image}>
                        <img src={props.image} alt="Regular Image" />
                    </div>
                    <div className={styles.card_content}>
                        <h4 className={styles.card_title}>{props.title} </h4>
                        <div className={styles.card_name}>{props.post}</div>
                    </div>
                    <div className={styles.card_footer}>
                        <a href="">
                            <i className="fa fa-facebook"></i>
                        </a>
                        <a href="">
                            <i className="fa fa-twitter"></i>
                        </a>
                        <a href="">
                            <i className="fa fa-github"></i>
                        </a>
                        <a href="">
                            <i className="fa fa-globe"></i>
                        </a>
                    </div>
                </div>
            ) : (
                <div className={styles.card_services}>
                    <div className={styles.card_image_services}>
                        <img src={props.image} alt="Service Image" />
                    </div>
                    <div className={styles.card_content}>
                        <h4 className={styles.card_title}>{props.title} </h4>
                        <div className={styles.card_name}>{props.post}</div>
                        <a className={styles.play_btn} onClick={toggleAudio}></a>
                    </div>
                    <div className="button-container" style={{ left: buttonPosition.left, top: buttonPosition.top }}>
                    <button className={`play_btn ${isPlaying ? 'pulsate' : ''}`} onClick={handleClick}></button>
                </div>
                </div>
            )}
        </>

    )
}

export default CardComponent