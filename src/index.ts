import express,{Request, Response} from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.get('/', function (request:Request, response: Response) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=25")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            response.render("index", data);
        });
});

app.get('/pokemon/:name', function (request: Request, response: Response) {
    const pokemonName = request.params.name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => res.json())
        .then(data => {
            response.render("pokemon", { pokemon: data });
        })
        .catch(error => {
            response.status(500).send("Erro ao buscar informações do Pokémon");
        });
});


app.listen(3000, function () {
    console.log("Server is running");
})