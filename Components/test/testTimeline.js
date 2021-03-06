describe('Testing component Timeline', () => {
  var component

  beforeEach(function () {
    component = new Timeline()
  })

  describe('Test Reverse', () => {
    it('should enable attribute reverse upon property changes', () => {
      component.reverse = true
      expect(component.getAttribute('reverse')).equal('true')
      expect(component.shadowRoot.querySelector('.main')
        .style.flexDirection).equal('column-reverse')
    })

    it('should enable attribute reverse upon property changes', () => {
      component.reverse = false
      expect(component.getAttribute('reverse')).equal('false')
      expect(component.shadowRoot.querySelector('.main')
        .style.flexDirection).equal('column')
    })
  })
})
