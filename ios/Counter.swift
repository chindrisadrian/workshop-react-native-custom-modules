//
//  Counter.swift
//  RNCustomModules
//
//  Created by Chindris Adrian on 4/10/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(Counter)
class Counter: RCTEventEmitter {
  
  private var count: Int = 0;
  
  @objc
  func increment() {
    count += 1;
    sendEvent(withName: "onChange", body: count)
  }
  
  @objc
    func getCount(
        _ resolve: RCTPromiseResolveBlock,
        rejecter reject: RCTPromiseRejectBlock
    ) {
    resolve(count);
  }
    @objc
    func setCount(_ newCount: NSNumber) {
        count = Int(truncating: newCount);
        sendEvent(withName: "onChange", body: count)
    }
  
  override func supportedEvents() -> [String]! {
    return ["onChange"]
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
