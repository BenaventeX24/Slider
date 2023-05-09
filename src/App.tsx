import React from "react";
import Slider from "./Slider";
import Box from "./Box";
import { css } from "@emotion/css";

function App() {
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
      `}
    >
      <Slider
        buttonRightStyles={css`
          width: 45px;
          height: 45px;
        `}
      >
        <Box>0</Box>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
        <Box>7</Box>
        <Box>8</Box>
        <Box>9</Box>
        <Box>10</Box>
        <Box>11</Box>
        <Box>12</Box>
        <Box>13</Box>
        <Box>14</Box>
        <Box>15</Box>
        <Box>16</Box>
        <Box>17</Box>
        <Box>18</Box>
        <Box>19</Box>
        <Box>20</Box>
        <Box>21</Box>
        <Box>22</Box>
        <Box>23</Box>
        <Box>24</Box>
        <Box>25</Box>
        <Box>26</Box>
        <Box>27</Box>
        <Box>28</Box>
        <Box>29</Box>
        <Box>30</Box>
        <Box>31</Box>
        <Box>32</Box>
        <Box>33</Box>
        <Box>34</Box>
        <Box>35</Box>
        <Box>36</Box>
        <Box>37</Box>
        <Box>38</Box>
        <Box>39</Box>
        <Box>40</Box>
        <Box>41</Box>
        <Box>42</Box>
        <Box>43</Box>
      </Slider>
    </div>
  );
}

export default App;
