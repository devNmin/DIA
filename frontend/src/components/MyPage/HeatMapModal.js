import React, {useEffect} from 'react'
import styles from './HeatMapModal.module.css';
import h337 from 'heatmapjs'

function ModalBasic({ setModalOpen, coord, offset }) {
    const widthRatio = (window.innerWidth * 0.90)/ 820;
    const heightRatio = (window.innerWidth * 0.90 * 1.5)/ 1180;
    
    console.log("===offset", offset)
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };
    useEffect(() => {
        // console.log("data", data)
        HeatMapHandler();
    },[]);
    

    const HeatMapHandler = async (e) => {
        var heatmapInstance = h337.create({
            container: document.getElementById("heatmap-canvas-modal"),
            radius : 20
        });
        let points = []        
        let heatmapData = coord
        let dataLen = heatmapData.length;
        let max =dataLen/50;
        let idx = 0;
        while (idx++ < dataLen-1) {
            var val = 1;
            max = Math.max(max, val);
            var point = {
                x: Math.floor(heatmapData[idx][1] * widthRatio * -1 + offset),
                y: Math.floor(heatmapData[idx][0] * heightRatio ),
            };
            points.push(point);
        }
        var data = { 
            max: max, 
            data: points 
        };
        heatmapInstance.setData(data);
      }

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
            </button>
            <div className={styles.heatMap_image}>
                <div id="heatmap-canvas-modal" className={styles.heatmap_canvas} onClick={closeModal}>
                </div>
            </div>
            
        </div>
    );
}
export default ModalBasic;