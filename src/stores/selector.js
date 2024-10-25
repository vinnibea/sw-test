const selector = (state) => ({
    setRootNode: state.setRootNode,
    setFilmNode: state.setFilmNode,
    setStarshipNode: state.setStarshipNode,
    resetNodes: state.resetNodes,
    setId: state.setId,
    nodes: state.nodes,
    edges: state.edges,
    id: state.id,
});

export default selector;