let apiUrl = "https://heroapi.juhuixinkj.com/api/Metaverse/getSpineConfig";

let nftName = "BAYC";
let nftId = 1;
let animName = "run";

let showAvatar = async(node) => {
    let res = await requestRes(nftName, nftId);

    let skeleton = node.addComponent(sp.Skeleton);
    skeleton.premultipliedAlpha = false;

    let skeletonData = new sp.SkeletonData();
    skeletonData.skeletonJson = res.json;
    skeletonData.atlasText = res.atlas;
    skeletonData.textures = [res.texture];
    skeletonData.textureNames = [nftName + ".png"];

    let skeleton = grid.data.skeleton;
    skeleton.skeletonData = skeletonData;
    skeleton.addAnimation(0, animName, true);
};

let requestRes = async(name, id) => {
    let res = await Util.http({
        url: apiUrl,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            name: name,
            id: id,
        },
    });

    res = JSON.parse(res);

    let result = {};

    result.atlas = await Util.load(res.info.atlas);
    result.texture = await Util.load(res.info.texture);
    result.json = await Util.load(res.info.json);
    result.image = res.info.image;

    return result;
};
