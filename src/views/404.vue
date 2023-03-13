<template>
    <div class="flex-container">
        <div class="row">

            <img src="https://media.giphy.com/media/b7oDqbZu8PiopnOF9x/giphy.gif" alt="gigBen10">

            <h1 class="title">404</h1>
            <h1 class="description">PAGE NOT FOUND</h1>
            <span class="back">

                <button>
                    <img src="https://cdn-icons-png.flaticon.com/512/261/261987.png" width="30" />
                    <a href="/" style="color: black;">Back to Home</a>
                </button>

            </span>

        </div>

    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.flex-container {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    width: 100vw;
}

.row {
    background-color: #1e252e;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: auto;
}

.title {
    display: flex;
    margin: 0;
    color: red;
    font-size: 8em;
    justify-content: center;
}

.description {
    justify-content: center;
    display: flex;
    font-size: 2em;
}

.undoImage {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 20%;
    margin: 0;
}

.back {
    justify-content: center;
    display: flex;
    align-items: center;
}

.backText {
    font-size: 2em;
}
</style>