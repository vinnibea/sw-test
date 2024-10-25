//helper to get only some keys of profiles
export function setProfile(profile) {
    return Object.entries(profile)
        .slice(1, 7)
        //replacing underscore to have proper key to view
        .map(([key, value]) => [key.replace(/_/gi, " "), value]);
}

//checks if image exists
export async function checkImageExistance(URL) {
    let error;
    let data;
    //example of trycatch, usually im not using fetch
    try {
        let response = await fetch(URL);
        if (response.ok) {
            data = response.url;
        }
    }

    catch (e) {
        error = e;
    }
    return [data, error]
} 
//just to not write that string everytime
export const imageURLConstructor = (param) =>
    `https://starwars-visualguide.com/assets/img/starships/${param}.jpg`;