import create from 'zustand';
import { io } from "socket.io-client";
import parser from "socket.io-msgpack-parser";
import {environmentConfig} from "../apis";
const socket = io(environmentConfig.BASE_URI, { transports: ["websocket", "polling"], parser});
socket.connect()
export const useSocket = create(set => ({
	socket: socket
}))
