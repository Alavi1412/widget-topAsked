# name: widget-topasked
# version: 0.1
# authors: SMHassanAlavi

register_asset 'stylesheets/widget-topAsked.scss'

after_initialize do
  #SiteSetting.class_eval do
  #  @choices[:layouts_sidebar_right_widgets].push('widget-topasked')
  #end
  DiscourseLayouts::WidgetHelper.add_widget('widget-topasked')
end
