//Imports
import * as Config          from "../package.json";
import {PowerPrompt}        from "powerprompt";
import * as Projects        from "./data/projects.json";
import * as Router          from "./router";
import * as Sessions        from "./data/sessions.json";
import * as System          from "./system";

//Constants
export const cookieParser   = require('cookie-parser');
export const config         = Config;
export const cp             = require("child_process");
export const express        = require("express");
export const fs             = require("fs");
export const path           = require("path");
export const pp             = new PowerPrompt();
export const projects       = Projects.projects;
export const prs            = Projects;
export const router         = Router;
export const ss             = Sessions.sessions;
export const sss            = Sessions;
export const sys            = System;
export const uuid           = require('uuid');



