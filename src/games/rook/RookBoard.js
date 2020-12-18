import React from "react";
import {range} from "../../util/Range";
import styles from './RookBoard.module.css';
import {capitalize} from "../../util/Capitalize";

export class RookBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { highlightedSquare: undefined, players: undefined };
    }

    nameOf(playerID) {
        if (this.state.players === undefined) {
            return 'somebody';
        }
        for (const {id, name} of this.state.players) {
            if (id === playerID) {
                return name;
            }
        }
        return 'the bot';
    }

    componentDidMount() {
        if (this.state.matchData === undefined) {
            const { protocol, hostname, port } = window.location;
            const server = `${protocol}//${hostname}:${port}`;
            const matchID = this.props.matchID;
            fetch(`${server}/games/Chessboard/${matchID}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            players: result.players
                        });
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                );
        }
    }

    onMouseEnterSquare = (key) => {
        this.setState({highlightedSquare: key});
    };

    onMouseLeaveSquare = () => {
        this.setState({highlightedSquare: undefined});
    };

    onClickSquare = (key) => {
        this.setState({highlightedSquare: undefined});
        this.props.moves.movePiece(key);
    };

    onClickRestart = () => {
        this.props.moves.restart();
    }

    render() {
        let rows = [];
        for (const i of range(8)) {
            let row = [];
            for (const j of range(8)) {
                row.push(
                    <td><div
                        id={[i,j]}
                        key={[i,j]}
                        className={((i+j) % 2 === 0) ? styles['light-square'] : styles['dark-square']}
                        onClick={() => this.onClickSquare([i,j])}
                        onMouseEnter={() => this.onMouseEnterSquare([i,j])}
                        onMouseLeave={() => this.onMouseLeaveSquare()}
                    >{
                        ((this.props.G.pos[0] === i) && (this.props.G.pos[1] === j)) ?
                            String.fromCharCode(9820) : (
                            ((this.state.highlightedSquare !== undefined)
                                && (this.state.highlightedSquare[0] === i)
                                && (this.state.highlightedSquare[1] === j))

                                ? String.fromCharCode(9814) : ''
                            )
                    }
                    </div></td>
                );
            }
            rows.push(
                <tr>{row}</tr>
            );
        }

        let status = undefined;
        if (this.props.ctx.gameover) {
            status = <div className={styles['status']}>
                {capitalize(this.nameOf(parseInt(this.props.ctx.gameover.winner))) + ' won!'}
            </div>;
        } else {
            status = <div className={styles['status']}>
                {'It is ' + this.nameOf(parseInt(this.props.ctx.currentPlayer)) + "'s turn."}
            </div>;
        }

        return (
            <div className={styles["board-wrapper"]}>
                {status}
                <table className={styles["board"]}>
                    {rows}
                </table>
            </div>
        );
    }
}