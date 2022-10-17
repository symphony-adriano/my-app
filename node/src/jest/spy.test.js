const video = {
    play: () => true
}

it('should call the play() method', () => {
    const spy = jest.spyOn(video, 'play')
    const isPlaying = video.play()

    expect(spy).toHaveBeenCalled()
    expect(isPlaying).toBe(true)
})