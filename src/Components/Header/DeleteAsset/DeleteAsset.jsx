import { useContext, useState } from "react";
import { CriptoContext } from "../../../Context";
import { toUpperCase } from "../../../utils";
import styles from './styles.module.css';
import { AiFillDelete } from "react-icons/ai";


export const DeleteAsset = () => {

    const { dataAssets, deleteAsset } = useContext(CriptoContext);

    // console.log(dataAssets);

    const handleClickDelete = (e) => {
        deleteAsset(e.target.id);
    }

    return (
        <div className="">
            {dataAssets.map(asset => (
                <div key={asset.id} className={styles.asset} >

                    <div>{toUpperCase(asset.id)}</div>
                    <div>{asset.amount}</div>
                    <AiFillDelete id={asset.id} className={styles.icon} onClick={handleClickDelete} />
                </div>
            ))}
        </div>
    )
}