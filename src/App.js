import React, {Component} from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
    // data:
    //     guardian: false
    // id: 1
    // key: true
    // playerIds: Array(3)
    // 0: 1
    // 1: 2
    // 2: 3

    constructor(props) {
        super(props);

        this.state = {
            response: null,
            rooms: null,
            tableRooms: null,
            table: null
        };

        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.openRoom = this.openRoom.bind(this);
        this.getTable = this.getTable.bind(this);
    }

    startGame() {
        //     curl -X "POST" "https://tds.blogcheck.tripled.io/start" \
        //  -H 'Content-Type: application/json; charset=utf-8' \
        //  -d $'{
        //     "playerCount": 3
        // }'

        axios.post(`https://tds.blogcheck.tripled.io/start`, {
            "playerCount": 3
        })
            .then(res => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    stopGame() {
        // curl -X "POST" "https://tds.blogcheck.tripled.io/stop"

        axios.post(`https://tds.blogcheck.tripled.io/stop`)
            .then(res => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    joinGame(number) {
    //     curl -X "POST" "https://tds.blogcheck.tripled.io/join" \
        //  -H 'Content-Type: application/json; charset=utf-8' \
        //  -d $'{
        //     "secretToken": "DO_NOT_SHARE_THIS1"
        // }'

        axios.post(`https://tds.blogcheck.tripled.io/join`, {
            "secretToken": `DO_NOT_SHARE_THIS${number}`
        })
            .then((res) => {
                console.log(res);
                this.setState({
                    response: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getRooms() {
        // curl "https://tds.blogcheck.tripled.io/my-rooms/DO_NOT_SHARE_THIS1"
        axios.get(`https://tds.blogcheck.tripled.io/my-rooms/DO_NOT_SHARE_THIS1`)
            .then((res) => {
                console.log(res);
                this.setState({...this.state, rooms: res.data.rooms});
            })
            .catch((error) => {
                console.log(error);
            });

    }

    openRoom() {
        //     curl -X "POST" "https://tds.blogcheck.tripled.io/open" \
        //  -H 'Content-Type: application/json; charset=utf-8' \
        //  -d $'{
        //     "secretToken": "DO_NOT_SHARE_THIS1",
        //         "targetPlayerId": "2"
        // }'
        axios.post(`https://tds.blogcheck.tripled.io/open`, {
            "secretToken": "DO_NOT_SHARE_THIS1",
            "targetPlayerId": "2"
        })
            .then((res) => {
                console.log(res);
                this.setState({...this.state, tableRooms: res.data});
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getTable() {
        // curl "https://tds.blogcheck.tripled.io/my-rooms/DO_NOT_SHARE_THIS1"
        axios.get(`https://tds.blogcheck.tripled.io/table`)
            .then((res) => {
                console.log(res);
                this.setState({...this.state, table: res.data});
            })
            .catch((error) => {
                console.log(error);
            });

    }


    render() {
        return (
            <div className="App">
                <button onClick={this.startGame}>Start Game</button>

                <button onClick={this.stopGame}>Stop Game</button>

                <button onClick={() => this.joinGame(1)}>Join Game - player 1</button>

                <button onClick={() => this.joinGame(2)}>Join Game - player 2</button>

                <button onClick={() => this.joinGame(3)}>Join Game - player 3</button>

                <div>{JSON.stringify(this.state)}</div>

                <button onClick={this.getRooms}>Get Rooms</button>

                <button onClick={this.openRoom}>Open Room</button>

                <button onClick={this.getTable}>Get Table</button>
            </div>
        );
    }
}

export default App;
