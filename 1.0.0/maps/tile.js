class Tile{
    constructor(profile){
        this.profile = profile;
    }

    getImage(callback){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE) {
                // if (xhr.status === 200 || xhr.status === 201) {
                //     console.log(xhr.responseText);
                // } else {
                //     console.error(xhr.responseText);
                // }

                callback(xhr.responseText);
            }
        };

        xhr.open('GET', this.profile.getUrl());
        xhr.send();
    }
}