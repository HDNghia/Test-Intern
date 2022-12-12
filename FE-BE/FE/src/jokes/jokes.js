import React, { useEffect, useState } from 'react';
import './jokes.scss';
import axios from 'axios';
import pngegg from '../images/pngegg.png';
import hlg from '../images/hlg.jpg';

function Jokes() {
    const [ListStory, setListStory] = useState([]);
    const [count, setCount] = useState(1);
    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(`http://localhost:8080/api/v1/joke`);
            setListStory(
                res.data.data ? res.data.data : []
            )
            console.log("check res: ", res);

        }
        fetchMyAPI()
    }, [])
    const handleEvalue = async (id, vote) => {
        let res = await axios.put(`http://localhost:8080/api/v1//update-vote?id=${id}`, { vote });
        console.log("check req udpate: ", res);
        setCount(
            count + 1
        )
    }
    return (
        <div className="Jokes">
            <div class="header ">
                <div class="p-3 text-left row">
                    <img class="col-1" src={hlg} />
                    <div class="col-8"></div>
                    <div class="mt-3"><i >Handicrafted by </i><br /> <b class="ml-5">Jim HLS</b></div>

                    <img clas="col-1" src={pngegg} />
                </div>
                <div class="bg-success">
                    <div class="container p-5 text-center text-white">
                        <h1>A joke a day keeps the doctor away</h1>
                        <div>If you joke wrong way, your teeth to pay. (Serious)</div>
                    </div>
                </div>

            </div>
            <div class="main container p-5">
                <div>
                    {ListStory && ListStory.length > 0 &&
                        ListStory.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item.id == count && index < ListStory.length ?
                                        <>
                                            <div>{item.story}</div>
                                            <hr width="80%"></hr>
                                            <div class="text-center mt-5">
                                                <input type="button" class="btn btn-primary mr-4 pr-5 pl-5" value="This is Funny" onClick={() => handleEvalue(item.id, "Like")} />
                                                <input type="button" class="btn btn-success pr-5 pl-5" value="This is not Funny" onClick={() => handleEvalue(item.id, "Dislike")} />
                                            </div>
                                        </> : <></>
                                    }
                                </div>
                            )
                        })
                    }
                    {count == ListStory.length + 1 ? <h3 class="text-center">That's all the jokes for today! Come back another day!</h3> : <></>}
                </div>
            </div>
            <div class="footer">
                <hr></hr>
                <div class="container">
                    <div class="text-center">
                        This website is created as part of HIsolution program. The materials contained on this website are
                        provided for general information only and do not constitute any form of advice. HLS
                        assumes no responsibility for the accuracy of any particular statement and accepts
                        no liability for any loss or damage which may arise from reliance on the information
                        contained on this site
                    </div>
                    <h6 class="text-center m-3">
                        Copyright 2021 HLS
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default Jokes;