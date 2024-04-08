import { useRef, useState } from "react";
import './styles.css';
import shrinkIcon from '../../../public/shrinkIcon.png';
import expandIcon from '../../../public/expandIcon.png';
import miniLogo from '../../../public/mini-logo.png';
import msgIcon from '../../../public/msgIcon.png';
// import axios from "axios";
import {routes} from '../../utils/routes.js'
import {client} from '@gradio/client';

export default function ChatBotComponent ({ready, url}) {
    
    const questionURL = routes.baseURL + routes.api.askGuruGen;
    console.log(questionURL)

    const inputRef = useRef();
    const lastChat = useRef();

    console.log(client);

    const [expand , setExpand] = useState(false);

    const [prevChat, setPrevChat] = useState([])

    const [question, setQuestion] = useState('');

    const questionInputHandler = ( e ) => {
        setQuestion(e.target.value);
    }

    const questionHandler = async () => {
        //send question to API and fetch the answer
        if(question === '')
            return;

        // setPrevChat([...prevChat,{ref: React.createRef() ,question , ans : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}]);

        // await axios.post(questionURL, {
        //     question
        // }).then((resp) => {
        //     setPrevChat({...prevChat, 'resp?.data'});
        // })
        // .catch((err : any) => {
        //     console.log(err.message);
        // })

        // const app = await client("https://5c14cc380cd896be9d.gradio.live/");
        // const result = await app.predict("/predict", [
        //     question,
        // ]);

        console.log("url: ",url)

        const app = await client("https://9dfe72c62938fd3e00.gradio.live/");
        const result = await app.predict("/predict", [		
                url, // string  in 'URL' Textbox component		
                question // string  in 'Question' Textbox component
        ]);


        console.log("soln: ",result.data);

        setPrevChat([...prevChat, {question, ans : result.data}])

        // app = '';
        // result = '';

        inputRef.current.value = '';
        setQuestion('');
    }

    // useMemo(() => {
    //     if(prevChat.length > 0) {
    //         const lastItem = prevChat[prevChat.length - 1];
    //         lastChat.current = lastItem.ref;
    //         console.log("LastItem: ",lastItem.ref);
    //     }
    // },[prevChat])

    console.log(lastChat.current);

    const expandHandler = () => {
        setExpand(!expand)
    }

    return (
        <div className={expand ? 'chatBotWholeContExpand' : 'chatBotWholeCont'}>
            <div className='chatBotTopCont'>
                <p className='chatBotTitle'>Chatbot</p>
                <img src={expand ? shrinkIcon : expandIcon} 
                    className='chatBotExpandIcon'
                    onClick={expandHandler}
                />
            </div>
            <div className={expand ? 'chatBotBottomContExpand' : 'chatBotBottomCont'}>
                <div className='chatBotQuestionsCont'>
                {
                    prevChat?.map((eachChat, index) => {

                        return (
                            <div key={(eachChat)} className='chatbotEachChatCont' ref={prevChat.ref}>
                                <p className='chatbotEachChatQuestion'>
                                    {eachChat?.question}
                                </p>
                                <p className='chatbotEachChatAnswer'>
                                    <img src={miniLogo} className='chatbotEachChatQuestionIcon'/>
                                    {eachChat?.ans}
                                </p>
                            </div>
                        )
                    })
                }
                </div>
                {!ready
                    ?
                <div className={expand ? 'chatBotAskContExpand' : 'chatBotAskCont'}>
                    <input ref={inputRef} className='chatBotAskInputCont' 
                        onChange={questionInputHandler}
                        placeholder="Ask GuruGen"
                        onKeyDown={e => {
                                        if(e.key === 'Enter')
                                            questionHandler(e)
                                    }}
                    />
                    <img src={msgIcon}
                        className='chatBotAskMsgImg'
                        onClick={questionHandler}
                    />
                </div>
                    :
                <p className={expand ? 'chatBotAskContExpand chatBotLoadingGlow' : 'chatBotAskCont chatBotLoadingGlow'} 
                    style={{textIndent: '2vh', color: '#E98955'}}
                    >GuruGen is learning...
                </p>
                }
            </div>
        </div>
    )
}