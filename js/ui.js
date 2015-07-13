$(function(){
  //Type
  $('input[name=wavetype]').change(function(){
    wave.Set.type = $('input[name=wavetype]:checked').val();
    $('#panelType').html($('input[name=wavetype]:checked').val());
  });

  //Frequency
  $('#panelFrequency').change(function(){
    wave.Set.frequency = $(this).val();
  });
  $('#sliderFrequency').slider({
    range: "min",
    value: 1000,
    min: 1,
    max: 10000,
    slide: function( event, ui ) {
      $("#panelFrequency").val(ui.value*0.01);
      wave.Set.frequency = ui.value*0.01;
    }
  });

  //Volume
  $('#panelVolume').change(function(){
    wave.Set.volume = $(this).val();
  });
  $('#sliderVolume').slider({
    range: "min",
    value: 50,
    min: 0,
    max: 59,
    slide: function( event, ui ) {
      $("#panelVolume").val(ui.value);
      wave.Set.volume = ui.value;
    }
  });

  //Phase
  $('#panelPhase').change(function(){
    wave.Set.phase = $(this).val();
  });
  $('#sliderPhase').slider({
    range: "min",
    value: 0,
    min: 0,
    max: 100,
    slide: function( event, ui ) {
      $("#panelPhase").val(ui.value);
      wave.Set.phase = ui.value;
    }
  });
});
