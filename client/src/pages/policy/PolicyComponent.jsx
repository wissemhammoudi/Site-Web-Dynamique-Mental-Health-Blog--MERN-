import React from 'react'
import styles from './PolicyComponent.module.css'
import { Link } from 'react-router-dom';


export default function PolicyComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.term_box}>
                <div className={styles.term_text}>
                    <h3 className={styles.title}>Our Policy And Privacy</h3>
                    <h5>Last Update: 23/02/2024</h5>
                    <p ><b>Greetings Users,</b>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores incidunt aut officia magni, laudantium placeat vero voluptate et facilis quo asperiores ab quis, delectus fuga quia laboriosam modi. In eligendi aspernatur totam hic sunt, quae voluptatibus ab quia repellendus soluta id quam voluptate molestiae fuga sapiente suscipit? Neque, quos mollitia?</p>
                    <p>Ab velit autem dicta quo nihil, eum reprehenderit numquam consequatur non, ad aut harum mollitia, alias voluptatibus. Maiores fugit laborum reiciendis totam, distinctio culpa mollitia alias quibusdam nostrum facere voluptas nesciunt, iure minima ipsa illo impedit dolore assumenda earum itaque aliquid obcaecati sunt doloribus ad commodi! Magni officia veniam doloremque.</p>
                    <p>Placeat eos officiis doloremque enim architecto ducimus id. Quo error placeat provident ullam? Nostrum ab totam perspiciatis? Nam minus repellendus ipsam harum non error. Temporibus, porro, tempora consequatur repudiandae eos facilis consequuntur nisi voluptates hic unde veritatis doloribus ab deleniti alias quisquam aut. Maiores distinctio quaerat in maxime doloribus! Cupiditate!</p>
                    <p>Impedit dignissimos voluptatum minus ex unde laboriosam nihil exercitationem doloribus! Ducimus sed eaque, alias mollitia voluptatum dicta neque. Harum ratione dolores quis eveniet omnis amet! Doloribus asperiores ratione voluptate at nesciunt accusamus cum cumque, tenetur tempore exercitationem similique vero eaque facilis dolor voluptas libero atque! Quidem accusantium eaque iste facilis!</p>
                    <p>Libero, ab iste. Amet, repellat modi alias itaque officiis vitae quibusdam animi assumenda, dolore illo dignissimos. Nam exercitationem repellat dolorum corrupti quod, beatae delectus ut ea ipsum impedit asperiores ab debitis atque. Amet ex enim eaque placeat atque repellendus quasi odit quibusdam animi vitae quos assumenda non, numquam obcaecati recusandae!</p>
                    <p>Enim repudiandae corrupti a ducimus, ut velit dignissimos eligendi nam perspiciatis, provident eum earum maxime delectus. Itaque harum est, odio minima repudiandae dicta recusandae quas! Velit doloribus ipsam recusandae atque facilis, omnis quisquam exercitationem consectetur, aut blanditiis rem impedit libero nihil temporibus, beatae ut ipsum similique id obcaecati aliquam dignissimos.</p>
                    <h4>I agree to the <span>Privacy and Policy</span> and I read the Privacy Notice.</h4>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.btn}>
                    <Link to={`/`}>
                        <button className={styles.red_btn}>Accept</button>
                    </Link>
                        <button className={styles.gray_btn}>Decline</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
