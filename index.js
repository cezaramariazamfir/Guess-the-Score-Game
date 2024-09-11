let matches = [];
let lives;
let score;





async function fetchAndStoreMatches() {
    try {
        const response = await fetch("results.json");
        const data = await response.json();
        matches = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function startGame(){

    lives = 3;
    score = 0;


    document.getElementById("points").textContent = `POINTS: 0`;
    document.getElementById("game_name").style.display = "block";
    document.getElementById("start_button").style.display = "block";

    document.getElementById("messi_face").style.display = "none";
    document.getElementById("ronaldo_face").style.display = "none";
    document.getElementById("murinho_face").style.display = "none";
    document.getElementById("messi_text").style.display = "none";
    document.getElementById("ronaldo_text").style.display = "none";
    document.getElementById("murinho_text").style.display = "none";

    const start_button = document.getElementById(`start_button`);
    start_button.onclick = async function (){
    document.getElementById(`game_name`).style.display = `none`;
    document.getElementById(`start_button`).style.display = `none`;

    document.getElementById("football1").style.display = "block";
    document.getElementById("football2").style.display = "block";
    document.getElementById("football3").style.display = "block";
    document.getElementById("points").style.display = "block";


    document.getElementById("messi_face").style.display = "block";
    document.getElementById("ronaldo_face").style.display = "block";
    document.getElementById("murinho_face").style.display = "block";
    document.getElementById("messi_text").style.display = "block";
    document.getElementById("ronaldo_text").style.display = "block";
    document.getElementById("murinho_text").style.display = "block";

    await fetchAndStoreMatches();
    matchIndex = displayRandomMatch(matches);


}
}

function displayRandomMatch(matches){
    console.log(lives);
    if (lives == 0)
    {
        document.getElementById("match_location").style.display = "none";
        document.getElementById("match_championship").style.display = "none";
        document.getElementById("match_players").style.display = "none";
        document.getElementById("submit_button").style.display = "none";
        document.getElementById("score1").style.display = "none";
        document.getElementById("score2").style.display = "none";



        console.log('dead');
        document.getElementById("lost").style.display = "block";
        document.getElementById("sad_messi").style.display = "block";
        document.getElementById("sad_ronaldo").style.display = "block";
        document.getElementById("restart_button").style.display = "block";

        restart = document.getElementById("restart_button");

    	restart.onclick = function () {
            console.log('restart');
            document.getElementById("lost").style.display = "none";
            document.getElementById("sad_messi").style.display = "none";
            document.getElementById("sad_ronaldo").style.display = "none";
            document.getElementById("restart_button").style.display = "none";
            document.getElementById("points").style.display = "none";
            startGame();
        }
        return 0;
    }


    const randomIndex = Math.floor(Math.random() * matches.length);
    const match_location = document.getElementById("match_location");
    match_location.textContent = matches[randomIndex].city + ', ' + matches[randomIndex].country;
    const match_championship = document.getElementById("match_championship");
    match_championship.textContent = matches[randomIndex].tournament;
    const match_players = document.getElementById("match_players");
    match_players.textContent = matches[randomIndex].home_team + '  -  ' + matches[randomIndex].away_team;

    const score1 = document.getElementById("score1");
    score1.placeholder = `${matches[randomIndex].home_team}`;

    const score2 = document.getElementById("score2");
    score2.placeholder = `${matches[randomIndex].away_team}`;


    
    const home_score = matches[randomIndex].home_score;
    const away_score =  matches[randomIndex].away_score;
    
    const submit = document.getElementById("submit_button");

    document.getElementById("match_location").style.display = "block";
    document.getElementById("match_championship").style.display = "block";
    document.getElementById("match_players").style.display = "block";
    document.getElementById("submit_button").style.display = "block";
    document.getElementById("score1").style.display = "block";
    document.getElementById("score2").style.display = "block";

    console.log(score);
    console.log(`Home Score: ${home_score}`); 
    console.log(`Away Score: ${away_score}`);


    messi = document.getElementById("messi_face");
    messi.onclick = function() {
        score1.value = home_score;
        score2.value = away_score;
        document.getElementById("messi_text").style.display = 'none';
        document.getElementById("messi_face").style.display = 'none';
    }

    ronaldo = document.getElementById("ronaldo_face");
    ronaldo.onclick = function() {
        document.getElementById("total_goals").textContent = `NO OF GOALS: ${home_score + away_score}`;
        document.getElementById("total_goals").style.display = 'block';
        document.getElementById("ronaldo_text").style.display = 'none';
        document.getElementById("ronaldo_face").style.display = 'none';
    }


    murinho = document.getElementById("murinho_face");
    murinho.onclick = function() {
        if (home_score > away_score)
            document.getElementById("score1").style.backgroundColor = "yellow";
        else if(home_score < away_score)
            document.getElementById("score2").style.backgroundColor = "yellow";
        else
        {
            document.getElementById("score1").style.backgroundColor = "yellow";
            document.getElementById("score2").style.backgroundColor = "yellow";
        }
            document.getElementById("murinho_text").style.display = 'none';
            document.getElementById("murinho_face").style.display = 'none';
    }

    submit.onclick = function (){

        console.log('SUBMIT');

        document.getElementById("match_location").style.display = "none";
        document.getElementById("match_championship").style.display = "none";
        document.getElementById("match_players").style.display = "none";
        document.getElementById("submit_button").style.display = "none";
        document.getElementById("score1").style.display = "none";
        document.getElementById("score2").style.display = "none";
        document.getElementById("skip").style.display = "block";
        document.getElementById("total_goals").style.display = 'none';
        document.getElementById("score1").style.backgroundColor = "white";
        document.getElementById("score2").style.backgroundColor = "white";

        console.log(typeof(score1.value));
        console.log(typeof(home_score));        

        if(Number(score1.value) == home_score && Number(score2.value) == away_score)
        {
            console.log('CORRECT');
            document.getElementById("correct").style.display = "block";
            score += 1;

            document.getElementById("points").textContent = `POINTS: ${score}`;
            
            document.addEventListener("keydown", function(event) {
                if (event.code === "Space") {
                    document.getElementById("correct").style.display = "none";
                    displayRandomMatch(matches);
                    console.log('SPACE');
                    document.getElementById("skip").style.display = "none";
                }
            }, {once: true});

        }
        else
        {
            console.log('INCORRECT');
            const scoreDisplay = document.getElementById("score_display");
            scoreDisplay.textContent = `${home_score} - ${away_score}`;

            document.getElementById("incorrect").style.display = "block";
            document.getElementById("score_display").style.display = "block";

            if(lives == 3) document.getElementById(`football1`).style.display = `none`;
            else if(lives == 2) document.getElementById('football2').style.display = 'none';
            else if(lives == 1) document.getElementById('football3').style.display = 'none';
            lives -= 1;

     
                   
                    document.addEventListener("keydown", function(event) {
                        if (event.code === "Space") {
                            console.log('SPACE');
                            document.getElementById("incorrect").style.display = "none";
                            document.getElementById("score_display").style.display = "none";
                            displayRandomMatch(matches);
                            document.getElementById("skip").style.display = "none";
                        }
                    }, {once: true});


        }

        score1.value = '';
        score2.value = '';

    }

}


startGame();



