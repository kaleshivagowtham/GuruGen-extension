// import { useState } from "react";
import './styles.css';
import minilogo from '../../../public/mini-logo.png';
import savitriLogo from '../../../public/savitriLogo.png';
import Frame from '../../../public/Frame.png'
import { useEffect, useState } from 'react';
import EachCard from '../EachCard';
import ChatBotComponent from '../ChatBotComponent';
import { routes } from '../../utils/routes';
import axios from 'axios';
import ChatBotSavitri from '../ChatBotSavitri';

export default function MainScreen () {

    const baseURL = routes.baseURL;

    const [videoDetails, setVideoDetails] = useState();

    const [bot, setBot] = useState(true);

    const [ready, setReady] = useState(false);

    useEffect(() => {

        const getVideoDetails = () => {
            const channelNameElement = document.querySelector(".channel-name a[title]");

            if(channelNameElement) {
                const channelName = channelNameElement.textContent;
                console.log("channel name: ",channelName);
                return channelName;
            }
        }

        const renderFun = async () => {
            chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
                const tab = tabs[0];
                if (tab) {
                    console.log("TAB: ",tab.id);
                    setVideoDetails({'title' : tab.title, 'channelName' : tab.url})

                    // send YouTube video URL to Model
                    // axios.post(baseURL, {videoURL: tab.url})
                    // .then(resp => {
                    //     console.log(resp);
                    //     setReady(true);
                    // })
                    // .catch(err => {
                    //     console.log(err);
                    // })

                    // chrome.scripting.executeScript(
                    //     {
                    //         target : {tabId : tab.id},
                    //         func : getVideoDetails,
                    //     },
                    //     (result) => {
                    //         console.log("Text content: ",result[0].result);
                    //     }
                    // )
                }
            });

            
        }

        renderFun();
  }, []);

    return (
        <div className="mainScreenWholeCont">
            <div className='mainScreenNavCont'>
                <img src={bot ? minilogo : savitriLogo} className='mainScreenNavLogo'/>
                <p className='mainScreenNavTitle'>{bot ? 'GuruGen' : 'Savitri Ai'}</p>
            </div>
            <div className='mainScreenMidCont'>
                <p className='mainScreenVideoTitle'>{videoDetails?.title}</p>
                <p className='mainScreenChannelName'>{videoDetails?.channelName}</p>
            </div>
            <div className='mainScreenCardsCont'>
                <EachCard cardTitle='Flashcards' link='http://localhost:3000/youtube/flashcards'/>
                <EachCard cardTitle='Notes' link='http://localhost:3000/youtube/notes'/>
                <EachCard cardTitle='Quiz' link='http://localhost:3000/youtube/quiz'/>
                <EachCard cardTitle='Projects' link='http://localhost:3000/youtube/projects'/>
            </div>
            <button className={bot ? 'switchBotButtonSavitri' : 'switchBotButton'} onClick={e => setBot(!bot)} />
            {bot === true && <ChatBotComponent ready={ready} url={videoDetails?.channelName} />}
            {bot === false && <ChatBotSavitri ready={ready} url={videoDetails?.channelName}/>}
            <a href='https://www.gurugen.in/'
                className='mainScreenVisitButton'
                target='_blank'
                >Visit Website 
                <img src={Frame} className='mainScreenVisitImg' />
            </a>
        </div>
    )
}