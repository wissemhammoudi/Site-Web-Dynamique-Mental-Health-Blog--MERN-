import React, { useState } from 'react';
import { Select } from 'flowbite-react';

import styles from './GethelpComponent.module.css';

export default function GethelpComponent() {
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');

    const options = [
        {
            label: "Prévention du suicide Tunisie",
            phoneNumber: "71 335 000",
            location: "Tunisie",
            howToHelp: "suicide"
        },
        {
            label: "Ligne nationale pour l'autisme",
            phoneNumber: "71 335 000",
            location: "Tunisie",
            howToHelp: "autisme"
        },
        {
            label: "Ligne d'assistance contre la dépression",
            phoneNumber: "71 335 000",
            location: "Tunisie",
            howToHelp: "dépression"
        },
    ];
    // Filter options based on location and howToHelp

    function handleSelect(event) {
        setValue(event.target.value);
    }

    function handleSelect1(event) {
        setValue1(event.target.value);
    }

    return (
        <div>
            <div>
<h3 className={styles.title}>Lignes d'assistance en santé mentale</h3>            </div>
            <h2 className={styles.subscribe__title}>
                Are you or someone you know in crisis? View our helplines below, learn more about using helplines, or use our handy search tool by clicking the button below.
            </h2>
            <div className={styles.subscribe}>
                <div className={styles.container}>
                    <div className={styles.boxContainer}>
                        <div className={styles.para}>Où êtes-vous basé(e) ?</div>
                        <div className={styles.box}>
                            <div className={styles.input_container}>
                                <Select onChange={handleSelect}
                                              class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg"

                                >
                                    <option value="">Tous</option> {/* Default option for all */}
                                    {[...new Set(options.map(option => option.location))].map((location, index) => (
                                        <option key={index} value={location}>
                                            {location}
                                        </option>
                                    ))}

                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className={styles.boxContainer}>
                        <div className={styles.parag}>Comment puis-je vous aider ?</div>
                        <div className={styles.box}>
                            <div className={styles.input_container}>
                                <Select onChange={handleSelect1}
                                              class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg"

                                >
                                    <option value="">Tous</option> 
                                    {[...new Set(options.map(option => option.howToHelp))].map((howToHelp, index) => (
                                        <option key={index} value={howToHelp}>
                                            {howToHelp}
                                        </option>
                                    ))}

                                </Select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <div className={styles.sectiongethelp}>
                <div>
                <h3 className={styles.title}>Numéros d'urgence</h3>
            </div>
                    <ul className={styles.linksgethelp}>
                        {value !== '' || value1 !== '' ? (
                            (() => {
                                const filteredOptions = options
                                    .filter(option =>
                                        (value === '' || option.location === value) &&
                                        (value1 === '' || option.howToHelp === value1)
                                    );

                                const allLocationsAreUSA = filteredOptions.every(option => option.location === 'USA');

                                return allLocationsAreUSA ? (
                                    <li>
                                        <strong style={{color:'#D294BB'}}>Numéros d'urgence en Tunisie</strong>
                                        {filteredOptions.map((option, index) => (
                                            <div key={index}>
                                                <p><b>Phone Number: </b>{option.phoneNumber}</p>
                                                <p><b>Emplacement :</b> {option.location}</p>
                                                <p><b>Comment aider :</b> {option.howToHelp}</p>
                                            </div>
                                        ))}
                                    </li>
                                ) : (
                                    filteredOptions.map((option, index) => (
                                        <li key={index}>
                                            <strong style={{color:'#E0D0E8'}}>{option.label}</strong>
                                            <p><b>Numéro de téléphone : </b>{option.phoneNumber}</p>
                                            <p><b>Emplacement :</b>{option.location}</p>
                                            <p><b>Comment aider :</b>{option.howToHelp}</p>
                                        </li>
                                    ))
                                );
                            })()
                        ) : (
                            options.map((option, index) => (
                                <li key={index}>
                                    <strong style={{color:'#E0D0E8'}}>{option.label}</strong>
                                    <p>Numéro de téléphone : {option.phoneNumber}</p>
                                    <p>Emplacement : {option.location}</p>
                                    <p>Comment aider : {option.howToHelp}</p>
                                </li>
                            ))
                        )}




                    </ul>
                </div>

            </div>
        </div>
    );
}
