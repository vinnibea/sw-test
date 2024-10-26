import { create } from 'zustand';
//i will leave it here as an example of what im building
export const initialNodes = {}
// [characterID]: [
// node -> {
//     id: '1',
//     type: 'input',
//     data: { label: 'Input' },
//     position: { x: 250, y: 25 },
// }],

//and this
export const initialEdges = []
// [characterID] : [edge -> { id: 'en1-n2', source: 'n1', target: 'n2' }],


//this object will be needed below to link films and related to character **starships**
//{...[characterID]: [film with required data -> {...filmNode}]}
export const filmsToLink = {};
//helpers
//just returns length for some type
function getTypeLength(array, type) {
    return array.filter(el => el.type === type).length
}
//gives us data of last element of type
//to increment position or id for new node for example
function getTypeLast(array, type) {
    return array.findLast(el => el.type === type) || [];
}

function edgeConstructor(start, end) {
    return {
        id: `e${start}-${end}`,
        source: start,
        target: end,
    };
}
// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => ({
    //state
    nodes: initialNodes,
    edges: initialEdges,
    films: filmsToLink,
    id: null,
    x: 0,
    //functions
    //Im using ID to store session storage object for every character as a link to values we will need to check or receive because of O(1) and keeps data unique
    setId: (id) => {
        set({ id })
    },
    //reset all values fn/just in case if needed
    resetNodes: () => {
        set({
            nodes: initialNodes,
            edges: initialEdges,
            x: 0,
            films: filmsToLink,
            id: null,
        })
    },
    //character - root node creation
    //if we are here we need to reset some values
    setRootNode: (node) => {
        //getting id for root node
        //access to it`s nodes by id, that`s why I have used an object to store data
        const nodes_in_state = get().nodes[get().id]
        //reseting x for positioning
        set({
            x: 0,
        })
        //setting new root/character if not exists
        if (!nodes_in_state) {
            set({
                nodes: {
                    ...get().nodes,
                    [get().id]: [
                        { ...node, id: String(1) }
                    ]
                },
            })
        }
    },
    //film node
    setFilmNode: (node, filmsLength, starshipsLength) => {
        //id of person/all nodes/character nodes to operate later
        const state_id = get().id;
        const all_nodes = get().nodes;
        const character_nodes = all_nodes[state_id];
        //getting id to link later
        //another approach will be setting different objects for each layer, could be done as a optimization
        const film_nodes_length = getTypeLength(character_nodes, 'default')
        //not to duplicate values
        if (filmsLength === film_nodes_length) return;
        //finding last film for positioning
        const last_film = getTypeLast(character_nodes, 'default');
        const new_node_id = String(character_nodes.length + 1);
        //new node with id and position
        //film node
        const node_to_set = {
            ...node, id: new_node_id, position: {
                y: node.position.y,
                x: last_film?.position?.x + 250 || 0,
            }
        };
        //setting new node
        const new_nodes_state = [...character_nodes, node_to_set];
        set({
            nodes: { ...all_nodes, [state_id]: new_nodes_state }
        });
        //new edge creation
        // example { id: 'e1-2', source: '1', target: '2' },
        const edge_to_create = edgeConstructor('1', new_node_id);
        //finding existing egdes for character
        const existing_edges = get().edges[state_id] || [];
        // creating new egde
        set({
            edges: {
                [state_id]: [...existing_edges, edge_to_create]
            }
        })
        //updating films
        if (starshipsLength) {
            set((state) => ({
                films: {
                    ...state.films,
                    [state_id]: {
                        ...state.films[state_id],
                        [node_to_set.data.label]: {
                            id: node_to_set.id,
                            x: node_to_set.position.x,
                            starships: starshipsLength,
                        }
                    }
                }
            }))
        }


    },
    //starship node adding
    setStarshipNode: (node, relatedFilm) => {
        //at some moment I had issues here, so additional check could be useful
        const state_id = get().id;
        const character_films = get().films[state_id];
        //if nothing to set to films with ships for this character - return
        if (!character_films || !character_films[relatedFilm] || !character_films[relatedFilm].starships) return;
        //for initial ship we are checking for position
        const all_nodes = get().nodes;
        const current_character_nodes = get().nodes[state_id];
        //position of ships parent
        const ship_x_position = get().x;
        //creating node with ship
        const node_to_set = {
            ...node, id: String(current_character_nodes.length + 1), position: {
                y: node.position.y,
                x: ship_x_position,
            }
        }
        //setting new node
        set({
            nodes: { ...all_nodes, [state_id]: [...current_character_nodes, node_to_set] }
        },
        );
        //creating new node from film to ship
        const all_edges = get().edges;
        const character_edges = get().edges[state_id]
        const related_film_id = character_films[relatedFilm].id;
        //creating new egde to film
        const edge_to_create = edgeConstructor(related_film_id, node_to_set.id)
        //connecting to related film
        set({
            edges: { ...all_edges, [state_id]: [...character_edges, edge_to_create] }
        })
        //decrementing amount of related ships each time
        const new_ships = character_films[relatedFilm].starships - 1;
        //to avoid duplicates when toogling discover/hide buttons
        set((state) => ({
            films: {
                ...state.films,
                [state_id]: {
                    ...character_films,
                    [relatedFilm]: {
                        ...character_films[relatedFilm],
                        starships: new_ships,
                    }
                }
            }
        }))

        //setting position for next created node to have margins between
        set({
            x: ship_x_position + 250,
        })
    },
    //it was here before me
}));

export default useStore;