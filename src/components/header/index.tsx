import { LayoutContext } from '../layout';
import { checkOrUncheckAll } from '@/helpers';
import globalStore from '@/store';
import { Checkbox } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

export default function ProfessorHeader() {

    const { professors, setProfessors } = globalStore((state: any) => state);
    const [allProfessorsAreChecked, setAllProfessorsAreChecked] =
        useState<boolean>(false);

    useEffect(() => {
        const areChecked: any = (item: any) => item.checked === true;

        if (professors.every(areChecked)) {
            setAllProfessorsAreChecked(true);
        } else {
            setAllProfessorsAreChecked(false);
        }
    }, [professors]);

    return (
        <div className="w-full flex justify-between items-center text-basicColor">
            {/* <div className="mr-4">
                <Checkbox
                    checked={allProfessorsAreChecked}
                    onClick={() => {
                        checkOrUncheckAll(professors, setProfessors);
                    }}
                />
            </div> */}

            <h3 className="w-[30%] max-[400px]:w-[80%] sm:w-[22%] text-sm font-medium">
                Nom 
            </h3>
            <h3 className="hidden sm:block w-[14%] text-sm font-medium">
                Postnom
            </h3>
            <h3 className="max-[400px]:hidden w-[30%] sm:w-[18%] text-sm font-medium">
                Prénom
            </h3>
            <h3 className="hidden sm:block w-[17%] text-sm font-medium">
                Cours
            </h3>
            <h3 className="hidden sm:block w-[10%] text-sm font-medium">
                Heures
            </h3>
            <h3 className="w-[20%] sm:w-[10%] text-sm font-medium">
                Adresse
            </h3>
            <h3 className="w-[20%] sm:w-[10%] text-sm font-medium">
                Date de naissance
            </h3>
            <h3 className="w-[20%] sm:w-[10%] text-sm font-medium">
                Actions
            </h3>
        </div>
    );
}